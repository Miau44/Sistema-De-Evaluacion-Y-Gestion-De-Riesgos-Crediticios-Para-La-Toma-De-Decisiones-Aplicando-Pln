<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    public function rootView(Request $request)
    {
        return 'app';
    }

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? $request->user() : null,
            ],
            'url_assets' => asset(''),
            'url_principal' => url(''),
            'flash' => [
                'bien' => fn() => $request->session()->get('bien'),
                'error' => fn() => $request->session()->get('error'),
                'planilla' => fn() => $request->session()->get('planilla'),
            ],
            'venta_id' => session('venta_id')
        ];
    }
}
