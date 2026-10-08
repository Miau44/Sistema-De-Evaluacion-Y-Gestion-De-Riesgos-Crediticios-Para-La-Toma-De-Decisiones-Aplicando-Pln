<?php

namespace Tests\Unit;

use App\Models\Publicacion;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class PublicacionTest extends TestCase
{

    /** @test */
    public function test_crear_publicacion()
    {

        Config::set('database.connections.mysql.database', 'unibienes_db_test');


        // Simulamos un usuario autenticado
        $user = User::factory()->create();
        Auth::login($user);

        // crear la publicacion
        $detalles = [
            [
                "id" => 0,
                "publicacion_id" => 0,
                "caracteristica" => "CAT1",
                "detalle" => "DET1",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "caracteristica" => "CAT2",
                "detalle" => "DET2",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "caracteristica" => "CAT3",
                "detalle" => "DET3",
            ],
        ];

        // imágenes de prueba
        Storage::fake('public');
        // Crear un array de imágenes simuladas
        $images = [
            [
                "id" => 0,
                "publicacion_id" => 0,
                "file" => UploadedFile::fake()->image('image1.jpg'),
                "url_imagen" => "",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "file" => UploadedFile::fake()->image('image2.jpg'),
                "url_imagen" => "",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "file" => UploadedFile::fake()->image('image3.jpg'),
                "url_imagen" => "",
            ],
        ];

        // Preparar los datos de la solicitud
        $fecha_actual = date("Y-m-d");
        $data_request = [
            "user_id" => Auth::user()->id,
            "categoria" => "VEHÍCULOS",
            "moneda" => "DÓLARES (USD)",
            "oferta_inicial" => 1000,
            "ubicacion" => "LA PAZ",
            "observaciones" => "OBSERVACIONES",
            "fecha_limite" => date("Y-m-d", strtotime($fecha_actual . ' +5 days')),
            "hora_limite" => "12:00",
            "monto_garantia" => "500",
            "publicacion_detalles" => $detalles,
            "publicacion_imagens" => $images,
            "eliminados_detalles" => [],
            "eliminados_imagens" => [],
        ];

        Log::debug($data_request);

        // Crear el request con archivos
        $request = Request::create(route('publicacions.store'), 'POST', $data_request);

        // Asegúrate de que el método crearPublicacion maneje correctamente los archivos
        $publicacion = Publicacion::crearPublicacion($request);

        // Aseguramos que la publicación ha sido creada
        $this->assertInstanceOf(Publicacion::class, $publicacion);
    }

    /** @test */
    public function test_actualizar_publicacion()
    {
        Config::set('database.connections.mysql.database', 'unibienes_db_test');

        // Simulamos un usuario autenticado
        $user = User::factory()->create();
        Auth::login($user);

        // crear la publicacion
        $detalles = [
            [
                "id" => 0,
                "publicacion_id" => 0,
                "caracteristica" => "CAT1",
                "detalle" => "DET1",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "caracteristica" => "CAT2",
                "detalle" => "DET2",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "caracteristica" => "CAT3",
                "detalle" => "DET3",
            ],
        ];

        // imágenes de prueba
        Storage::fake('public');
        // Crear un array de imágenes simuladas
        $images = [
            [
                "id" => 0,
                "publicacion_id" => 0,
                "file" => UploadedFile::fake()->image('image1.jpg'),
                "url_imagen" => "",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "file" => UploadedFile::fake()->image('image2.jpg'),
                "url_imagen" => "",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "file" => UploadedFile::fake()->image('image3.jpg'),
                "url_imagen" => "",
            ],
        ];

        // Preparar los datos de la solicitud
        $fecha_actual = date("Y-m-d");
        $data_request = [
            "user_id" => Auth::user()->id,
            "categoria" => "VEHÍCULOS",
            "moneda" => "DÓLARES (USD)",
            "oferta_inicial" => 1000,
            "ubicacion" => "LA PAZ",
            "observaciones" => "OBSERVACIONES",
            "fecha_limite" => date("Y-m-d", strtotime($fecha_actual . ' +5 days')),
            "hora_limite" => "12:00",
            "monto_garantia" => "500",
            "publicacion_detalles" => $detalles,
            "publicacion_imagens" => $images,
            "eliminados_detalles" => [],
            "eliminados_imagens" => [],
        ];

        // Crear el request con archivos
        $request = Request::create(route('publicacions.store'), 'POST', $data_request);

        // crear publicacion
        $publicacion = Publicacion::crearPublicacion($request);

        // Aseguramos que la publicación ha sido creada
        $this->assertInstanceOf(Publicacion::class, $publicacion);

        // ACTUALIZACIÓN
        // Preparar los datos de la solicitud
        $detalles = $publicacion->publicacion_detalles;
        $images = $publicacion->publicacion_imagens;

        $detalles[] = [
            "id" => 0,
            "publicacion_id" => 0,
            "caracteristica" => "NUEVA CAT",
            "detalle" => "NUEVO DETALLE",
        ];
        $images[] = [
            "id" => 0,
            "publicacion_id" => 0,
            "file" => UploadedFile::fake()->image('nuevaimagen.jpg'),
            "url_imagen" => "",
        ];

        $fecha_actual = date("Y-m-d");
        $data_request = [
            "user_id" => Auth::user()->id,
            "categoria" => "OTROS BIENES",
            "moneda" => "BOLIVIANOS (BS)",
            "oferta_inicial" => 1000,
            "ubicacion" => "COCHABAMBA",
            "observaciones" => "OBSERVACIONES MOD.",
            "fecha_limite" => date("Y-m-d", strtotime($fecha_actual . ' +8 days')),
            "hora_limite" => "11:00",
            "monto_garantia" => "300",
            "publicacion_detalles" => $detalles,
            "publicacion_imagens" => $images,
            "eliminados_detalles" => [],
            "eliminados_imagens" => [],
        ];

        // Crear el request con archivos
        $request = Request::create(route('publicacions.update', $publicacion->id), 'PUT', $data_request);

        // actualizar publicacion
        $publicacionActualizada = Publicacion::actualizarPublicacion($publicacion, $request);

        $this->assertEquals($data_request['categoria'], $publicacionActualizada->categoria);
        $this->assertEquals($data_request['moneda'], $publicacionActualizada->moneda);
        $this->assertEquals($data_request['oferta_inicial'], $publicacionActualizada->oferta_inicial);
        $this->assertEquals($data_request['ubicacion'], $publicacionActualizada->ubicacion);
        $this->assertEquals($data_request['observaciones'], $publicacionActualizada->observaciones);
    }

    /** @test */
    public function test_eliminar_publicacion()
    {
        Config::set('database.connections.mysql.database', 'unibienes_db_test');
        // Simulamos un usuario autenticado
        $user = User::factory()->create();
        Auth::login($user);

        // crear la publicacion
        $detalles = [
            [
                "id" => 0,
                "publicacion_id" => 0,
                "caracteristica" => "CAT1",
                "detalle" => "DET1",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "caracteristica" => "CAT2",
                "detalle" => "DET2",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "caracteristica" => "CAT3",
                "detalle" => "DET3",
            ],
        ];

        // imágenes de prueba
        Storage::fake('public');
        // Crear un array de imágenes simuladas
        $images = [
            [
                "id" => 0,
                "publicacion_id" => 0,
                "file" => UploadedFile::fake()->image('image1.jpg'),
                "url_imagen" => "",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "file" => UploadedFile::fake()->image('image2.jpg'),
                "url_imagen" => "",
            ],
            [
                "id" => 0,
                "publicacion_id" => 0,
                "file" => UploadedFile::fake()->image('image3.jpg'),
                "url_imagen" => "",
            ],
        ];

        // Preparar los datos de la solicitud
        $fecha_actual = date("Y-m-d");
        $data_request = [
            "user_id" => Auth::user()->id,
            "categoria" => "VEHÍCULOS",
            "moneda" => "DÓLARES (USD)",
            "oferta_inicial" => 1000,
            "ubicacion" => "LA PAZ",
            "observaciones" => "OBSERVACIONES",
            "fecha_limite" => date("Y-m-d", strtotime($fecha_actual . ' +5 days')),
            "hora_limite" => "12:00",
            "monto_garantia" => "500",
            "publicacion_detalles" => $detalles,
            "publicacion_imagens" => $images,
            "eliminados_detalles" => [],
            "eliminados_imagens" => [],
        ];

        // Crear el request con archivos
        $request = Request::create(route('publicacions.store'), 'POST', $data_request);

        // crear publicacion
        $publicacion = Publicacion::crearPublicacion($request);

        // Aseguramos que la publicación ha sido creada
        $this->assertInstanceOf(Publicacion::class, $publicacion);

        // ELIMINAR PUBLICACION
        $publicacionActualizada = Publicacion::eliminarPublicacion($publicacion);

        $this->assertEquals(5, $publicacionActualizada->estado_sub);
    }
}
