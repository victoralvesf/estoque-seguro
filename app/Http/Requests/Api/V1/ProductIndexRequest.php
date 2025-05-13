<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class ProductIndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'per_page' => 'sometimes|integer|min:1|max:100',
            'page' => 'sometimes|integer|min:1',
            'order_by' => 'sometimes|string|in:name,price,quantity,created_at,updated_at',
            'sort' => 'sometimes|string|in:asc,desc',
            'category_id' => 'sometimes|integer|exists:categories,id',
            'min_price' => 'sometimes|numeric|min:1',
            'max_price' => 'sometimes|numeric|gt:min_price',
            'min_quantity' => 'sometimes|numeric|min:1',
            'max_quantity' => 'sometimes|numeric|gt:min_quantity',
            'name' => 'sometimes|string|max:100',
        ];
    }

    public function messages(): array
    {
        return [
            'per_page.integer' => 'The per_page value must be an integer.',
            'per_page.min' => 'The per_page value must be at least 1.',
            'per_page.max' => 'The per_page value may not be greater than 100.',

            'page.integer' => 'The page value must be an integer.',
            'page.min' => 'The page value must be at least 1.',

            'order_by.string' => 'The order_by value must be a string.',
            'order_by.in' => 'The order_by value must be one of the following: name, price, quantity, created_at, or updated_at.',

            'sort.string' => 'The sort value must be a string.',
            'sort.in' => 'The sort value must be either asc or desc.',

            'category_id.integer' => 'The category_id must be an integer.',
            'category_id.exists' => 'The selected category_id does not exist.',

            'price_min.numeric' => 'The price_min value must be a number.',
            'price_min.min' => 'The price_min value must be at least 1.',

            'price_max.numeric' => 'The price_max value must be a number.',
            'price_max.gt' => 'The price_max value must be greater than price_min.',

            'quantity_min.numeric' => 'The quantity_min value must be a number.',
            'quantity_min.min' => 'The quantity_min value must be at least 1.',

            'quantity_max.numeric' => 'The quantity_max value must be a number.',
            'quantity_max.gt' => 'The quantity_max value must be greater than quantity_min.',

            'name.string' => 'The name must be a string.',
            'name.max' => 'The name may not be greater than 100 characters.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'message' => 'Validation error',
            'errors' => $validator->errors()
        ], 422));
    }
}
