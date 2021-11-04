import { formatCurrencyString } from "use-shopping-cart";

export default function ProductPricing(product) {
    return formatCurrencyString({
        value: product.price, 
        language: navigator.language
    })
}