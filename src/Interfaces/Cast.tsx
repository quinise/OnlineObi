// This file defines the interface, Cast, which describes the atributes of a divination cast

export interface Cast {
    id: string,
    odu: string,
    timestamp: Date,
    answer: string,
    maleObi1: string,
    maleObi2: string,
    femaleObi1: string,
    femaleObi2: string,
    interpretation: string,
    title: string
}