<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'description' => ['required', 'string', 'min:20', 'max:65000'],
            'quantity' => ['required', 'integer', 'min:0', 'max:10000'],
            'price' => ['required', 'numeric', 'min:0.01', 'decimal:2'],
            'currency_code' => ['string', 'nullable'],
            'category' => ['required', 'string', 'max:100'],
            'sku' => ['required', 'string', 'max:255', 'unique:products,sku'],
        ];
    }
}
