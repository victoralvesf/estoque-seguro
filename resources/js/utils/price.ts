export function formatPrice(price: number | string, withoutCode = false) {
    const value = typeof price === 'string' ? parseFloat(price) : price

    const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)

    if (withoutCode) {
        return formatted.replace('R$', '').trim()
    }

    return formatted
}

export const unmaskPrice = (value: string) => {
    if (!value) return '0.00'

    if (!value.includes(',')) value += ',0'
    if (value.split(',')[1].length === 1) value += '0'

    return value.replaceAll('.', '').replace(',', '.')
}
