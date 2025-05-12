import { sizes } from '@/utils/sizes'
import styled from 'styled-components'

export const FilterWrapper = styled.div`
    display: none;

    @media (min-width: 1024px) {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: ${sizes(2)};
    }
`

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${sizes(4)};
    width: 100%;
    height: 100%;

    @media (min-width: 1024px) {
        padding-right: ${sizes(4)};
    }
`

export const FilterCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${sizes(2)};
    border-radius: ${sizes(2)};
`

export const FilterCardTitle = styled.p`
    color: var(--foreground);
    font-weight: 600;
    font-size: 0.875rem;
`

export const PriceLabel = styled.span`
    color: var(--foreground);
    font-weight: 300;
    font-size: 0.875rem;

    @media (min-width: 1024px) {
        font-size: 0.75rem;
    }
`
