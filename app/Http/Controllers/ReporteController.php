<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Configuracion;
use App\Models\ReporteFinanciero;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use PDF;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class ReporteController extends Controller
{

    public $titulo = [
        'font' => [
            'bold' => true,
            'size' => 12,
            'family' => 'Times New Roman'
        ],
        'borders' => [
            'allBorders' => [
                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_NONE,
            ],
        ],
    ];

    public $textoBold = [
        'font' => [
            'bold' => true,
            'size' => 10,
        ],
    ];

    public $headerTabla = [
        'font' => [
            'bold' => true,
            'size' => 10,
            'color' => ['argb' => 'ffffff'],
        ],
        'alignment' => [
            'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
        ],
        'borders' => [
            'allBorders' => [
                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
            ],
        ],
        'fill' => [
            'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
            'color' => ['rgb' => '203764']
        ],
    ];

    public $bodyTabla = [
        'font' => [
            'size' => 10,
        ],
        'alignment' => [
            'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
            // 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
        ],
        'borders' => [
            'allBorders' => [
                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
            ],
        ],
    ];

    public $textLeft = [
        'alignment' => [
            'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
        ],
    ];

    public $textRight = [
        'alignment' => [
            'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT,
        ],
    ];


    public $textCenter = [
        'alignment' => [
            'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
        ],
    ];

    private $configuracion = null;
    public function __construct()
    {
        $this->configuracion = Configuracion::first();
        if (!$this->configuracion) {
            $this->configuracion = new Configuracion([
                "nombre_sistema" => "SISPRENDASOL S.A.",
                "alias" => "SP",
                "logo" => "logo.png",
                "fono" => "2222222",
                "dir" => "LOS OLIVOS",
            ]);
        }
    }

    public function usuarios()
    {
        return Inertia::render("Admin/Reportes/Usuarios");
    }

    public function r_usuarios(Request $request)
    {
        $tipoR = $request->tipoR;
        $tipo =  $request->tipo;
        $usuarios = User::select("users.*")
            ->where('id', '!=', 1);

        if ($tipo != 'todos') {
            $request->validate([
                'tipo' => 'required',
            ]);
            $usuarios->where('tipo', $tipo);
        }

        $usuarios = $usuarios->orderBy("paterno", "ASC")->get();

        if ($tipoR == 'pdf') {
            $pdf = PDF::loadView('reportes.usuarios', compact('usuarios'))->setPaper('legal', 'landscape');

            // ENUMERAR LAS PÁGINAS USANDO CANVAS
            $pdf->output();
            $dom_pdf = $pdf->getDomPDF();
            $canvas = $dom_pdf->get_canvas();
            $alto = $canvas->get_height();
            $ancho = $canvas->get_width();
            $canvas->page_text($ancho - 90, $alto - 25, "Página {PAGE_NUM} de {PAGE_COUNT}", null, 9, array(0, 0, 0));

            return $pdf->stream('usuarios.pdf');
        } else {
            $spreadsheet = new Spreadsheet();
            $spreadsheet->getProperties()
                ->setCreator("ADMIN")
                ->setLastModifiedBy('Administración')
                ->setTitle('Registros')
                ->setSubject('Registros')
                ->setDescription('Registros')
                ->setKeywords('PHPSpreadsheet')
                ->setCategory('Listado');

            $sheet = $spreadsheet->getActiveSheet();

            $spreadsheet->getDefaultStyle()->getFont()->setName('Arial');

            $fila = 1;
            if (file_exists(public_path() . '/imgs/' . $this->configuracion->logo)) {
                $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                $drawing->setName('logo');
                $drawing->setDescription('logo');
                $drawing->setPath(public_path() . '/imgs/' . $this->configuracion->logo); // put your path and image here
                $drawing->setCoordinates('A' . $fila);
                $drawing->setOffsetX(5);
                $drawing->setOffsetY(0);
                $drawing->setHeight(60);
                $drawing->setWorksheet($sheet);
            }

            $fila = 2;
            $sheet->setCellValue('A' . $fila, $this->configuracion->nombre_sistema);
            $sheet->mergeCells("A" . $fila . ":L" . $fila);  //COMBINAR CELDAS
            $sheet->getStyle('A' . $fila . ':L' . $fila)->getAlignment()->setHorizontal('center');
            $sheet->getStyle('A' . $fila . ':L' . $fila)->applyFromArray($this->titulo);
            $fila++;
            $sheet->setCellValue('A' . $fila, "LISTA DE USUARIOS");
            $sheet->mergeCells("A" . $fila . ":L" . $fila);  //COMBINAR CELDAS
            $sheet->getStyle('A' . $fila . ':L' . $fila)->getAlignment()->setHorizontal('center');
            $sheet->getStyle('A' . $fila . ':L' . $fila)->applyFromArray($this->titulo);
            $fila++;
            $fila++;
            $sheet->setCellValue('A' . $fila, 'N°');
            $sheet->setCellValue('B' . $fila, 'USUARIO');
            $sheet->setCellValue('C' . $fila, 'PATERNO');
            $sheet->setCellValue('D' . $fila, 'MATERNO');
            $sheet->setCellValue('E' . $fila, 'NOMBRE(S)');
            $sheet->setCellValue('F' . $fila, 'C.I.');
            $sheet->setCellValue('G' . $fila, 'DIRECCIÓN');
            $sheet->setCellValue('H' . $fila, 'CORREO');
            $sheet->setCellValue('I' . $fila, 'TELÉFONO/CELULAR');
            $sheet->setCellValue('J' . $fila, 'TIPO');
            $sheet->setCellValue('K' . $fila, 'ACCESO');
            $sheet->setCellValue('L' . $fila, 'FECHA DE REGISTRO');
            $sheet->getStyle('A' . $fila . ':L' . $fila)->applyFromArray($this->headerTabla);
            $fila++;

            foreach ($usuarios as $key => $user) {
                $sheet->setCellValue('A' . $fila, $key + 1);
                $sheet->setCellValue('B' . $fila, $user->usuario);
                $sheet->setCellValue('C' . $fila, $user->paterno);
                $sheet->setCellValue('D' . $fila, $user->materno);
                $sheet->setCellValue('E' . $fila, $user->nombre);
                $sheet->setCellValue('F' . $fila, $user->full_ci);
                $sheet->setCellValue('G' . $fila, $user->dir);
                $sheet->setCellValue('H' . $fila, $user->correo);
                $sheet->setCellValue('I' . $fila, $user->fono);
                $sheet->setCellValue('J' . $fila, $user->tipo);
                $sheet->setCellValue('K' . $fila, $user->acceso == 1 ? 'HABILITADO' : 'DENEGADO');
                $sheet->setCellValue('L' . $fila, $user->fecha_registro_t);
                $sheet->getStyle('A' . $fila . ':L' . $fila)->applyFromArray($this->bodyTabla);
                $fila++;
            }

            $sheet->getColumnDimension('A')->setWidth(6);
            $sheet->getColumnDimension('B')->setWidth(15);
            $sheet->getColumnDimension('C')->setWidth(15);
            $sheet->getColumnDimension('D')->setWidth(10);
            $sheet->getColumnDimension('E')->setWidth(20);
            $sheet->getColumnDimension('F')->setWidth(12);
            $sheet->getColumnDimension('G')->setWidth(15);
            $sheet->getColumnDimension('H')->setWidth(15);
            $sheet->getColumnDimension('I')->setWidth(13);
            $sheet->getColumnDimension('J')->setWidth(12);
            $sheet->getColumnDimension('K')->setWidth(12);
            $sheet->getColumnDimension('L')->setWidth(12);

            foreach (range('A', 'L') as $columnID) {
                $sheet->getStyle($columnID)->getAlignment()->setWrapText(true);
            }

            $sheet->getPageSetup()->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_LANDSCAPE);
            $sheet->getPageMargins()->setTop(0.5);
            $sheet->getPageMargins()->setRight(0.1);
            $sheet->getPageMargins()->setLeft(0.1);
            $sheet->getPageMargins()->setBottom(0.1);
            $sheet->getPageSetup()->setPrintArea('A:L');
            $sheet->getPageSetup()->setFitToWidth(1);
            $sheet->getPageSetup()->setFitToHeight(0);

            // DESCARGA DEL ARCHIVO
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment;filename="usuarios' . time() . '.xlsx"');
            header('Cache-Control: max-age=0');
            $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
            $writer->save('php://output');
        }
    }


    public function clientes()
    {
        return Inertia::render("Admin/Reportes/Clientes");
    }

    public function r_clientes(Request $request)
    {
        $tipoR = $request->tipoR;
        $fecha_ini =  $request->fecha_ini;
        $fecha_fin =  $request->fecha_fin;
        $clientes = Cliente::select("clientes.*");

        if ($fecha_ini && $fecha_fin) {
            $clientes->whereBetween("fecha_registro", [$fecha_ini, $fecha_fin]);
        }

        $clientes = $clientes->get();

        if ($tipoR == 'pdf') {
            $pdf = PDF::loadView('reportes.clientes', compact('clientes'))->setPaper('legal', 'landscape');

            // ENUMERAR LAS PÁGINAS USANDO CANVAS
            $pdf->output();
            $dom_pdf = $pdf->getDomPDF();
            $canvas = $dom_pdf->get_canvas();
            $alto = $canvas->get_height();
            $ancho = $canvas->get_width();
            $canvas->page_text($ancho - 90, $alto - 25, "Página {PAGE_NUM} de {PAGE_COUNT}", null, 9, array(0, 0, 0));

            return $pdf->stream('clientes.pdf');
        } else {
            $spreadsheet = new Spreadsheet();
            $spreadsheet->getProperties()
                ->setCreator("ADMIN")
                ->setLastModifiedBy('Administración')
                ->setTitle('Registros')
                ->setSubject('Registros')
                ->setDescription('Registros')
                ->setKeywords('PHPSpreadsheet')
                ->setCategory('Listado');

            $sheet = $spreadsheet->getActiveSheet();

            $spreadsheet->getDefaultStyle()->getFont()->setName('Arial');

            $fila = 1;
            if (file_exists(public_path() . '/imgs/' . $this->configuracion->logo)) {
                $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                $drawing->setName('logo');
                $drawing->setDescription('logo');
                $drawing->setPath(public_path() . '/imgs/' . $this->configuracion->logo); // put your path and image here
                $drawing->setCoordinates('A' . $fila);
                $drawing->setOffsetX(5);
                $drawing->setOffsetY(0);
                $drawing->setHeight(60);
                $drawing->setWorksheet($sheet);
            }

            $fila = 2;
            $sheet->setCellValue('A' . $fila, $this->configuracion->nombre_sistema);
            $sheet->mergeCells("A" . $fila . ":AB" . $fila);  //COMBINAR CELDAS
            $sheet->getStyle('A' . $fila . ':AB' . $fila)->getAlignment()->setHorizontal('center');
            $sheet->getStyle('A' . $fila . ':AB' . $fila)->applyFromArray($this->titulo);
            $fila++;
            $sheet->setCellValue('A' . $fila, "LISTA DE CLIENTES");
            $sheet->mergeCells("A" . $fila . ":AB" . $fila);  //COMBINAR CELDAS
            $sheet->getStyle('A' . $fila . ':AB' . $fila)->getAlignment()->setHorizontal('center');
            $sheet->getStyle('A' . $fila . ':AB' . $fila)->applyFromArray($this->titulo);
            $fila++;
            $fila++;
            $sheet->setCellValue('A' . $fila, 'Nombre Cliente');
            $sheet->setCellValue('B' . $fila, 'C.I.');
            $sheet->setCellValue('C' . $fila, 'Nacionalidad');
            $sheet->setCellValue('D' . $fila, 'Sexo');
            $sheet->setCellValue('E' . $fila, 'Fecha Nacimiento');
            $sheet->setCellValue('F' . $fila, 'Dirección');
            $sheet->setCellValue('G' . $fila, 'Teléfono');
            $sheet->setCellValue('H' . $fila, 'Correo');
            $sheet->setCellValue('I' . $fila, 'Nombre Lugar Trabajo');
            $sheet->setCellValue('J' . $fila, 'Número identificación Tributaria');
            $sheet->setCellValue('K' . $fila, 'Empresa Unipersonal');
            $sheet->setCellValue('L' . $fila, 'Actividad Económica');
            $sheet->setCellValue('M' . $fila, 'Dirección');
            $sheet->setCellValue('N' . $fila, 'Teléfono');
            $sheet->setCellValue('O' . $fila, 'Correo');
            $sheet->setCellValue('P' . $fila, 'Cargo');
            $sheet->setCellValue('Q' . $fila, 'Tiempo Servicio');
            $sheet->setCellValue('R' . $fila, 'Fecha Ingreso');
            $sheet->setCellValue('S' . $fila, 'Estado Civil');
            $sheet->setCellValue('T' . $fila, 'Vivienda');
            $sheet->setCellValue('U' . $fila, 'Grado Instrucción');
            $sheet->setCellValue('V' . $fila, 'Situación Laboral');
            $sheet->setCellValue('W' . $fila, 'Profesión');
            $sheet->setCellValue('X' . $fila, 'Nombre Cónyugue');
            $sheet->setCellValue('Y' . $fila, 'C.I.');
            $sheet->setCellValue('Z' . $fila, 'Nacionalidad');
            $sheet->setCellValue('AA' . $fila, 'Ocupación');
            $sheet->setCellValue('AB' . $fila, 'Fecha de Registro');
            $sheet->getStyle('A' . $fila . ':AB' . $fila)->applyFromArray($this->headerTabla);
            $fila++;

            foreach ($clientes as $key => $cliente) {
                $sheet->setCellValue('A' . $fila, $cliente->full_name);
                $sheet->setCellValue('B' . $fila, $cliente->full_ci);
                $sheet->setCellValue('C' . $fila, $cliente->nacionalidad);
                $sheet->setCellValue('D' . $fila, $cliente->sexo);
                $sheet->setCellValue('E' . $fila, $cliente->fecha_nac);
                $sheet->setCellValue('F' . $fila, $cliente->dir);
                $sheet->setCellValue('G' . $fila, $cliente->fono);
                $sheet->setCellValue('H' . $fila, $cliente->correo);
                $sheet->setCellValue('I' . $fila, $cliente->nom_lugartrabajo);
                $sheet->setCellValue('J' . $fila, $cliente->nro_nit);
                $sheet->setCellValue('K' . $fila, $cliente->unipersonal);
                $sheet->setCellValue('L' . $fila, $cliente->actividad);
                $sheet->setCellValue('M' . $fila, $cliente->dir_lab);
                $sheet->setCellValue('N' . $fila, $cliente->fono_lab);
                $sheet->setCellValue('O' . $fila, $cliente->correo_lab);
                $sheet->setCellValue('P' . $fila, $cliente->cargo_lab);
                $sheet->setCellValue('Q' . $fila, $cliente->tiempo_lab);
                $sheet->setCellValue('R' . $fila, $cliente->fecha_ingreso_lab);
                $sheet->setCellValue('S' . $fila, $cliente->estado_civil);
                $sheet->setCellValue('T' . $fila, $cliente->vivienda);
                $sheet->setCellValue('U' . $fila, $cliente->grado_instruccion);
                $sheet->setCellValue('V' . $fila, $cliente->situacion_laboral);
                $sheet->setCellValue('W' . $fila, $cliente->profesion);
                $sheet->setCellValue('X' . $fila, $cliente->full_name_conyuge);
                $sheet->setCellValue('Y' . $fila, $cliente->full_ci_conyuge);
                $sheet->setCellValue('Z' . $fila, $cliente->nacionalidad_conyuge);
                $sheet->setCellValue('AA' . $fila, $cliente->ocupacion_conyuge);
                $sheet->setCellValue('AB' . $fila, $cliente->fecha_registro);
                $sheet->getStyle('A' . $fila . ':AB' . $fila)->applyFromArray($this->bodyTabla);
                $fila++;
            }

            $sheet->getColumnDimension('A')->setWidth(20);
            $sheet->getColumnDimension('B')->setWidth(15);
            $sheet->getColumnDimension('C')->setWidth(15);
            $sheet->getColumnDimension('D')->setWidth(10);
            $sheet->getColumnDimension('E')->setWidth(15);
            $sheet->getColumnDimension('F')->setWidth(12);
            $sheet->getColumnDimension('G')->setWidth(15);
            $sheet->getColumnDimension('H')->setWidth(15);
            $sheet->getColumnDimension('I')->setWidth(18);
            $sheet->getColumnDimension('J')->setWidth(12);
            $sheet->getColumnDimension('K')->setWidth(12);
            $sheet->getColumnDimension('L')->setWidth(12);
            $sheet->getColumnDimension('M')->setWidth(12);
            $sheet->getColumnDimension('N')->setWidth(12);
            $sheet->getColumnDimension('O')->setWidth(12);
            $sheet->getColumnDimension('P')->setWidth(12);
            $sheet->getColumnDimension('Q')->setWidth(12);
            $sheet->getColumnDimension('R')->setWidth(12);
            $sheet->getColumnDimension('S')->setWidth(12);
            $sheet->getColumnDimension('T')->setWidth(12);
            $sheet->getColumnDimension('U')->setWidth(12);
            $sheet->getColumnDimension('V')->setWidth(12);
            $sheet->getColumnDimension('W')->setWidth(12);
            $sheet->getColumnDimension('X')->setWidth(12);
            $sheet->getColumnDimension('Y')->setWidth(12);
            $sheet->getColumnDimension('Z')->setWidth(12);
            $sheet->getColumnDimension('AA')->setWidth(12);
            $sheet->getColumnDimension('AB')->setWidth(12);

            foreach (range('A', 'AB') as $columnID) {
                $sheet->getStyle($columnID)->getAlignment()->setWrapText(true);
            }

            $sheet->getPageSetup()->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_LANDSCAPE);
            $sheet->getPageMargins()->setTop(0.5);
            $sheet->getPageMargins()->setRight(0.1);
            $sheet->getPageMargins()->setLeft(0.1);
            $sheet->getPageMargins()->setBottom(0.1);
            $sheet->getPageSetup()->setPrintArea('A:AB');
            $sheet->getPageSetup()->setFitToWidth(1);
            $sheet->getPageSetup()->setFitToHeight(0);

            // DESCARGA DEL ARCHIVO
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment;filename="clientes' . time() . '.xlsx"');
            header('Cache-Control: max-age=0');
            $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
            $writer->save('php://output');
        }
    }

    public function reporte_financieros()
    {
        return Inertia::render("Admin/Reportes/ReporteFinancieros");
    }

    public function r_reporte_financieros(Request $request)
    {
        $tipoR = $request->tipoR;
        $tipo =  $request->tipo;
        $fecha_ini =  $request->fecha_ini;
        $fecha_fin =  $request->fecha_fin;
        $reporte_financieros = ReporteFinanciero::select("reporte_financieros.*");

        if ($tipo != 'todos') {
            $reporte_financieros->where("tipo", $tipo);
        }

        if ($fecha_ini && $fecha_fin) {
            $reporte_financieros->whereBetween("fecha_registro", [$fecha_ini, $fecha_fin]);
        }

        $reporte_financieros = $reporte_financieros->get();

        if ($tipoR == 'pdf') {
            $pdf = PDF::loadView('reportes.reporte_financieros', compact('reporte_financieros'))->setPaper('letter', 'portrait');

            // ENUMERAR LAS PÁGINAS USANDO CANVAS
            $pdf->output();
            $dom_pdf = $pdf->getDomPDF();
            $canvas = $dom_pdf->get_canvas();
            $alto = $canvas->get_height();
            $ancho = $canvas->get_width();
            $canvas->page_text($ancho - 90, $alto - 25, "Página {PAGE_NUM} de {PAGE_COUNT}", null, 9, array(0, 0, 0));

            return $pdf->stream('reporte_financieros.pdf');
        } else {
            $spreadsheet = new Spreadsheet();
            $spreadsheet->getProperties()
                ->setCreator("ADMIN")
                ->setLastModifiedBy('Administración')
                ->setTitle('Registros')
                ->setSubject('Registros')
                ->setDescription('Registros')
                ->setKeywords('PHPSpreadsheet')
                ->setCategory('Listado');

            $sheet = $spreadsheet->getActiveSheet();

            $spreadsheet->getDefaultStyle()->getFont()->setName('Arial');

            $fila = 1;
            if (file_exists(public_path() . '/imgs/' . $this->configuracion->logo)) {
                $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                $drawing->setName('logo');
                $drawing->setDescription('logo');
                $drawing->setPath(public_path() . '/imgs/' . $this->configuracion->logo); // put your path and image here
                $drawing->setCoordinates('A' . $fila);
                $drawing->setOffsetX(5);
                $drawing->setOffsetY(0);
                $drawing->setHeight(60);
                $drawing->setWorksheet($sheet);
            }

            $fila = 2;
            $sheet->setCellValue('A' . $fila, $this->configuracion->nombre_sistema);
            $sheet->mergeCells("A" . $fila . ":E" . $fila);  //COMBINAR CELDAS
            $sheet->getStyle('A' . $fila . ':E' . $fila)->getAlignment()->setHorizontal('center');
            $sheet->getStyle('A' . $fila . ':E' . $fila)->applyFromArray($this->titulo);
            $fila++;
            $sheet->setCellValue('A' . $fila, "REPORTE FINANCIERO");
            $sheet->mergeCells("A" . $fila . ":E" . $fila);  //COMBINAR CELDAS
            $sheet->getStyle('A' . $fila . ':E' . $fila)->getAlignment()->setHorizontal('center');
            $sheet->getStyle('A' . $fila . ':E' . $fila)->applyFromArray($this->titulo);
            $fila++;
            $fila++;
            $sheet->setCellValue('A' . $fila, 'N°');
            $sheet->setCellValue('B' . $fila, 'CLIENTE');
            $sheet->setCellValue('C' . $fila, 'TIPO DE DOCUMENTO');
            $sheet->setCellValue('D' . $fila, 'TIPO DE RIESGO');
            $sheet->setCellValue('E' . $fila, 'FECHA DE REGISTRO');
            $sheet->getStyle('A' . $fila . ':E' . $fila)->applyFromArray($this->headerTabla);
            $fila++;

            foreach ($reporte_financieros as $key => $reporte_financiero) {
                $sheet->setCellValue('A' . $fila, $key + 1);
                $sheet->setCellValue('B' . $fila, $reporte_financiero->cliente->full_name);
                $sheet->setCellValue('C' . $fila, $reporte_financiero->tipo_documento->nombre);
                $sheet->setCellValue('D' . $fila, $reporte_financiero->tipo);
                $sheet->setCellValue('E' . $fila, $reporte_financiero->fecha_registro_t);
                $sheet->getStyle('A' . $fila . ':E' . $fila)->applyFromArray($this->bodyTabla);
                $fila++;
            }

            $sheet->getColumnDimension('A')->setWidth(6);
            $sheet->getColumnDimension('B')->setWidth(30);
            $sheet->getColumnDimension('C')->setWidth(22);
            $sheet->getColumnDimension('D')->setWidth(15);
            $sheet->getColumnDimension('E')->setWidth(20);

            foreach (range('A', 'E') as $columnID) {
                $sheet->getStyle($columnID)->getAlignment()->setWrapText(true);
            }

            $sheet->getPageSetup()->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_PORTRAIT);
            $sheet->getPageMargins()->setTop(0.5);
            $sheet->getPageMargins()->setRight(0.1);
            $sheet->getPageMargins()->setLeft(0.1);
            $sheet->getPageMargins()->setBottom(0.1);
            $sheet->getPageSetup()->setPrintArea('A:E');
            $sheet->getPageSetup()->setFitToWidth(1);
            $sheet->getPageSetup()->setFitToHeight(0);

            // DESCARGA DEL ARCHIVO
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment;filename="reporte_financiero' . time() . '.xlsx"');
            header('Cache-Control: max-age=0');
            $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
            $writer->save('php://output');
        }
    }

    public function greporte_financieros()
    {
        return Inertia::render("Admin/Reportes/GReporteFinancieros");
    }


    public function r_greporte_financieros(Request $request)
    {
        $tipo = $request->tipo;
        $fecha_ini = $request->fecha_ini;
        $fecha_fin = $request->fecha_fin;

        $tipos = ["BAJO", "MEDIO", "ALTO", "NO APTO"];
        if ($tipo != 'todos') {
            $tipos = [$tipo];
        }

        $colores = [
            "BAJO" => "#28a745",   // verde
            "MEDIO" => "#ffc107",  // amarillo
            "ALTO" => "#fd7e14",   // naranja
            "NO APTO" => "#dc3545" // rojo
        ];

        $data = [];
        foreach ($tipos as $key => $tipo) {
            $t_reporte_financieros = ReporteFinanciero::where("tipo", $tipo);
            if ($fecha_ini && $fecha_fin) {
                $t_reporte_financieros->whereBetween("fecha_registro", [$fecha_ini, $fecha_fin]);
            }

            $t_reporte_financieros = $t_reporte_financieros->count();

            $data[] = [
                'name' => $tipo,
                'y' => (float) $t_reporte_financieros,
                'color' => $colores[$tipo] ?? '#000000'
            ];
        }

        return response()->JSON([
            "categories" => $tipos,
            "data" => $data,
        ]);
    }
}
