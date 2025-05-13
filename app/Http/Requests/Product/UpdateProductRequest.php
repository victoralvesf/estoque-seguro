<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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
            'name' => ['sometimes', 'string', 'min:3', 'max:255'],
            'description' => ['sometimes', 'string', 'min:20', 'max:65000'],
            'quantity' => ['sometimes', 'integer', 'min:0', 'max:10000'],
            'price' => ['sometimes', 'numeric', 'min:0.01', 'decimal:2'],
            'currency_code' => ['string', 'nullable'],
            'category' => ['sometimes', 'string', 'max:100'],
            'sku' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('products')->ignore($this->product),
            ],
        ];
    }
}
