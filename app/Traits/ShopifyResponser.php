<?php

namespace App\Traits;

trait ShopifyResponser
{
    protected function successResponse($data,$message = 'Success', $statusCode = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    protected function errorResponse($message = 'Error', $statusCode = 400, $errors = [])
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors,
        ], $statusCode);
    }
    protected function notFoundResponse($message = 'Not Found', $statusCode = 404)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], $statusCode);
    }
    protected function unauthorizedResponse($message = 'Unauthorized', $statusCode = 401)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], $statusCode);
    }
    protected function forbiddenResponse($message = 'Forbidden', $statusCode = 403)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], $statusCode);
    }
}
