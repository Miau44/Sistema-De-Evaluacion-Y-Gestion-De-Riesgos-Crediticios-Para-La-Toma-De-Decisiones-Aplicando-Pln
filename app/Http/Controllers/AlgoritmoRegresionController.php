<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// importamos la libreria para el algoritmo
use Phpml\Regression\MultipleLinearRegression;
use Phpml\Classification\LogisticRegression;

class AlgoritmoRegresionController extends Controller
{

    public function procesarExcel(Request $request)
    {
        $request->validate([
            'doc1' => "required|file|mimes:xls,xlsx",
            'doc2' => "required|file|mimes:xls,xlsx",
        ], [
            'doc1.mimes' => "Solo puedes cambiar archivos :mimes",
            'doc2.required' => "Debes cargar un archivo",
            'doc2.mimes' => "Solo puedes cambiar archivos :mimes",
        ]);

        $puntosTotales = 0;
        $totalItems = 0;

        // Procesar ambos formularios
        $formRequisitos = $request->fil("doc1");
        $formCreditos = $request->fil("doc2");
        $puntosTotales += $this->leerExcel($formRequisitos, $totalItems, "requisito");
        $puntosTotales += $this->leerExcel($formCreditos, $totalItems, "credito");

        // Calcular porcentaje general
        $porcentaje = $totalItems > 0 ? round(($puntosTotales / $totalItems) * 100, 2) : 0;

        // Clasificación
        if ($porcentaje >= 90) {
            $riesgo = 'Cliente con Bajo Riesgo de Pago de Crédito';
        } elseif ($porcentaje >= 70) {
            $riesgo = 'Cliente con Riesgo Medio de Pago de Crédito';
        } elseif ($porcentaje >= 55) {
            $riesgo = 'Cliente con Alto Riesgo de Pago de Crédito';
        } else {
            $riesgo = 'Cliente No Apto para Crédito';
        }

        // APLICAR LAS REGRESIONES
        $probabilidadPago = $this->predecirProbabilidad([$porcentaje, rand(50, 100), rand(50, 100)]);
        $riesgoLogistico = $this->clasificar([$porcentaje, rand(50, 100)]);

        return response()->JSON([
            'porcentaje' => $porcentaje,
            'riesgo' => $riesgo,
            'probabilidad_pago' => round($probabilidadPago * 100, 2) . '%',
            'riesgo_logistico' => $riesgoLogistico
        ]);
    }

    private function leerExcel($file, &$totalItems, $tipo)
    {
        $spreadsheet = IOFactory::load($file->getRealPath());
        $sheet = $spreadsheet->getActiveSheet();

        $puntos = 0;

        if ($tipo == 'credito') {
            $filas = $sheet->getRowIterator(6);
            foreach ($filas as $fila) {
                $celdas = $fila->getCellIterator();
                $celdas->setIterateOnlyExistingCells(false);

                $colB = $sheet->getCell('B' . $fila->getRowIndex())->getValue(); // REQUISITOS

                if ($colB) {
                    $colD = $sheet->getCell('D' . $fila->getRowIndex())->getValue(); // DEUDOR
                    $colF = $sheet->getCell('F' . $fila->getRowIndex())->getValue(); // CODEUDOR
                    $colH = $sheet->getCell('H' . $fila->getRowIndex())->getValue(); // GARANTE

                    if (trim($colD) != '' || trim($colF) != '' || trim($colH) != '') {
                        // si todas las celdas no estan vacias
                        if (trim($colD) != '') {
                            $puntos++;
                        } else {
                            $puntos--;
                        }

                        if (trim($colF) != '') {
                            $puntos++;
                        } else {
                            $puntos--;
                        }

                        if (trim($colH) != '') {
                            $puntos++;
                        } else {
                            $puntos--;
                        }
                        $totalItems++;
                    }
                }
            }
        } else {
            $filas = $sheet->getRowIterator(8);
            $puntos = 0;
            foreach ($filas as $fila) {
                $celdas = $fila->getCellIterator();
                $celdas->setIterateOnlyExistingCells(false);
                $colB = $sheet->getCell('B' . $fila->getRowIndex())->getValue(); // TIPO DOCUMENTO/ATRIBUTO
                if ($colB) {
                    //OFICIAL DE CRÉDITOS
                    $colD = $sheet->getCell('D' . $fila->getRowIndex())->getValue(); // SI
                    $colE = $sheet->getCell('E' . $fila->getRowIndex())->getValue(); // NO

                    //SUBGERENTE
                    $colH = $sheet->getCell('H' . $fila->getRowIndex())->getValue(); // SI
                    $colI = $sheet->getCell('I' . $fila->getRowIndex())->getValue(); // NO


                    if (trim($colD) != '' || trim($colE)) {
                        // si todas las celdas no estan vacias
                        if (trim($colD) != '') {
                            $puntos++;
                            $totalItems++;
                        } elseif (trim($colE) != '') {
                            $puntos--;
                            $totalItems++;
                        }
                    }
                    if (trim($colH) != '' || trim($colI) != '') {
                        // si todas las celdas no estan vacias
                        if (trim($colH) != '') {
                            $puntos++;
                            $totalItems++;
                        } elseif (trim($colI) != '') {
                            $puntos--;
                            $totalItems++;
                        }
                    }
                }
            }
        }
        return $puntos;
    }

    // REGRESIÓN LINEAL
    public function predecirProbabilidad(array $valores)
    {
        $regression = new MultipleLinearRegression();

        // Datos de entrenamiento 
        $regression->train(
            [
                [40, 50, 45], // bajo puntaje en ambos formularios
                [60, 65, 62], // puntaje medio
                [75, 78, 76], // puntaje alto
                [90, 92, 91], // puntaje excelente
            ],
            [0.3, 0.6, 0.85, 0.90] // probabilidades asociadas
        );

        // Predicción
        $resultado = $regression->predict($valores);

        // Limitar entre 0 y 1
        return max(0, min(1, $resultado));
    }

    // REGRESIÓN LOGISTICA
    public function clasificar(array $valores)
    {
        $classifier = new LogisticRegression();

        /**
         * Entrenamiento:
         * Cada vector [x1, x2] representa:
         *   x1 = Puntaje en requisitos
         *   x2 = Puntaje en créditos
         * La etiqueta indica el nivel de riesgo observado históricamente.
         */
        $classifier->train(
            [
                [90, 95], // excelente en ambos → bajo riesgo
                [80, 75], // bueno pero no perfecto → riesgo medio
                [65, 60], // regular → riesgo alto
                [45, 40], // muy bajo → no apto
            ],
            ['BAJO', 'MEDIO', 'ALTO', 'NO APTO']
        );

        return $classifier->predict($valores);
    }
}
