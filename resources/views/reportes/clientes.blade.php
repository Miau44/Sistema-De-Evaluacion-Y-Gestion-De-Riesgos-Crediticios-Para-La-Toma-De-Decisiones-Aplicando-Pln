<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Usuarios</title>
    <style type="text/css">
        * {
            font-family: sans-serif;
        }

        @page {
            margin-top: 1.5cm;
            margin-bottom: 0.3cm;
            margin-left: 0cm;
            margin-right: 0cm;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            margin-top: 20px;
            page-break-before: avoid;
        }

        table thead tr th,
        tbody tr td {
            padding: 3px;
            word-wrap: break-word;
        }

        table thead tr th {
            font-size: 7pt;
        }

        table tbody tr td {
            font-size: 6pt;
        }


        .encabezado {
            width: 100%;
        }

        .logo img {
            position: absolute;
            height: 70px;
            top: -20px;
            left: 0px;
        }

        h2.titulo {
            width: 450px;
            margin: auto;
            margin-top: 0PX;
            margin-bottom: 15px;
            text-align: center;
            font-size: 14pt;
        }

        .texto {
            width: 250px;
            text-align: center;
            margin: auto;
            margin-top: 15px;
            font-weight: bold;
            font-size: 1.1em;
        }

        .fecha {
            width: 250px;
            text-align: center;
            margin: auto;
            margin-top: 15px;
            font-weight: normal;
            font-size: 0.85em;
        }

        .total {
            text-align: right;
            padding-right: 15px;
            font-weight: bold;
        }

        table {
            width: 100%;
        }

        table thead {
            background: rgb(236, 236, 236)
        }

        tr {
            page-break-inside: avoid !important;
        }

        .centreado {
            padding-left: 0px;
            text-align: center;
        }

        .datos {
            margin-left: 15px;
            border-top: solid 1px;
            border-collapse: collapse;
            width: 250px;
        }

        .txt {
            font-weight: bold;
            text-align: right;
            padding-right: 5px;
        }

        .txt_center {
            font-weight: bold;
            text-align: center;
        }

        .cumplimiento {
            position: absolute;
            width: 150px;
            right: 0px;
            top: 86px;
        }

        .b_top {
            border-top: solid 1px black;
        }

        .gray {
            background: rgb(202, 202, 202);
        }

        .bg-principal {
            background: #153f59;
            color: white;
        }

        .txt_rojo {}

        .img_celda img {
            width: 45px;
        }
    </style>
</head>

<body>
    @inject('configuracion', 'App\Models\Configuracion')
    <div class="encabezado">
        <div class="logo">
            <img src="{{ $configuracion->first()->logo_b64 }}">
        </div>
        <h2 class="titulo">
            {{ $configuracion->first()->nombre_sistema }}
        </h2>
        <h4 class="texto">LISTA DE CLIENTES</h4>
        <h4 class="fecha">Expedido: {{ date('d-m-Y') }}</h4>
    </div>
    <table border="1">
        <thead class="bg-principal">
            <tr>
                <th>Nombre Cliente</th>
                <th>C.I.</th>
                <th>Nacionalidad</th>
                <th>Sexo</th>
                <th>Fecha Nacimiento</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Nombre Lugar Trabajo</th>
                <th>Número identificación Tributaria</th>
                <th>Empresa Unipersonal</th>
                <th>Actividad Económica</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Cargo</th>
                <th>Tiempo Servicio</th>
                <th>Fecha Ingreso</th>
                <th>Estado Civil</th>
                <th>Vivienda</th>
                <th>Grado Instrucción</th>
                <th>Situación Laboral</th>
                <th>Profesión</th>
                <th>Nombre Cónyugue</th>
                <th>C.I.</th>
                <th>Nacionalidad</th>
                <th>Ocupación</th>
                <th>Fecha de Registro</th>
            </tr>
        </thead>
        <tbody>
            @php
                $cont = 1;
            @endphp
            @foreach ($clientes as $cliente)
                <tr>
                    <td>{{ $cliente->full_name }}</td>
                    <td>{{ $cliente->full_ci }}</td>
                    <td>{{ $cliente->nacionalidad }}</td>
                    <td>{{ $cliente->sexo }}</td>
                    <td>{{ $cliente->fecha_nac_t }}</td>
                    <td>{{ $cliente->dir }}</td>
                    <td>{{ $cliente->fono }}</td>
                    <td>{{ $cliente->correo }}</td>
                    <td>{{ $cliente->nom_lugartrabajo }}</td>
                    <td>{{ $cliente->nro_nit }}</td>
                    <td>{{ $cliente->unipersonal }}</td>
                    <td>{{ $cliente->actividad }}</td>
                    <td>{{ $cliente->dir_lab }}</td>
                    <td>{{ $cliente->fono_lab }}</td>
                    <td>{{ $cliente->correo_lab }}</td>
                    <td>{{ $cliente->cargo_lab }}</td>
                    <td>{{ $cliente->tiempo_lab }}</td>
                    <td>{{ $cliente->fecha_ingreso_lab_t }}</td>
                    <td>{{ $cliente->estado_civil }}</td>
                    <td>{{ $cliente->vivienda }}</td>
                    <td>{{ $cliente->grado_instruccion }}</td>
                    <td>{{ $cliente->situacion_laboral }}</td>
                    <td>{{ $cliente->profesion }}</td>
                    <td>{{ $cliente->full_name_conyuge }}</td>
                    <td>{{ $cliente->full_ci_conyuge }}</td>
                    <td>{{ $cliente->nacionalidad_conyugye }}</td>
                    <td>{{ $cliente->ocupacion_conyugue }}</td>
                    <td class="centreado">{{ $cliente->fecha_registro_t }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
