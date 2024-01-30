<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    public function render($request, Throwable $exception)
{
    if ($this->isHttpException($exception)) {
        $statusCode = $exception->getStatusCode();
        return Inertia::render('error', ['status' => $statusCode, 'message' => $exception->getMessage()])
            ->toResponse($request)
            ->setStatusCode($statusCode);
    } else {
        // Manejar excepciones no HTTP
        return Inertia::render('UnhandledError')
            ->toResponse($request)
            ->setStatusCode(500);
    }

    return parent::render($request, $exception);
}
}
