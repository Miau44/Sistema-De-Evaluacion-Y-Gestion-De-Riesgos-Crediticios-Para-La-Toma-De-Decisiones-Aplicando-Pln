<?php

namespace Tests\Unit;

use App\Models\Cliente;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Faker\Factory as Faker;

class RegistroTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        Config::set('database.connections.mysql.database', 'unibienes_db_test');
        $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);
        // datos de prueba
        $faker = Faker::create();
        $email = $faker->unique()->email();
        $nom_cli = $faker->unique()->name();
        $data = [
            // '_token' => csrf_token(),
            'email' => $email,
            'nombre' => $nom_cli,
            'paterno' => $faker->lastName(),
            'materno' => $faker->lastName(),
            'ci' => $faker->unique()->randomNumber(8),
            'complemento' => 'A',
            'ci_exp' => 'LP',
            'fono' => '123456789',
            'dpto_residencia' => 'La Paz',
            'banco' => 'Banco de Crédito',
            'nro_cuenta' => $faker->unique()->numberBetween(10000000000, 99999999999),
            'moneda' => 'Bolivianos',
            'password' => 'Abc123456.',
            'password_confirmation' => 'Abc123456.',
            'terminos' => '1', // Aceptado
            'foto_ci_anverso' => UploadedFile::fake()->image('anverso.jpg'),
            'foto_ci_reverso' => UploadedFile::fake()->image('reverso.jpg')
        ];

        // usar la ruta de registro con los datos
        // $response = $this->post(route('register'), $data);
        $response = $this->call(
            'POST',
            route("register"),
            $data,
        );
        // Verifica que la validación se haya pasado
        $response->assertStatus(302);

        // Verifica que el usuario fue creado
        Log::debug($email);
        $user = User::where('usuario', $email)->get()->last();
        $this->assertNotNull($user);
        $this->assertEquals($email, $user->usuario);
        $this->assertTrue(Hash::check('Abc123456.', $user->password));

        // Verifica que el cliente fue creado
        $cliente = Cliente::where('user_id', $user->id)->get()->last();
        $this->assertNotNull($cliente);
        $this->assertEquals($email, $cliente->email);
        $this->assertEquals('BANCO DE CRÉDITO', $cliente->banco);

        // Verifica que el usuario está autenticado
        $this->assertAuthenticatedAs($user);
    }
}
