import React from "react";

type Type1 = {
    value: string;
};

type Type2 = {
    value: number;
};

// A union type means a value can be of multiple types. Since both Type1 and Type2 have a member of "value" with different types, the union will convert "value" to be a type of "string | number";
type UnionType = Type1 | Type2;

// A generic type with a default generic of "nothing". Will combine the generic type and whatever values we decide to put into the type itself through an intersection.
type GenericType<T = {}> = T & {};

// We can go even further with our union by using a generic to add yet another type to our "value" member
type GenericUnionType<T = {}> = T | {
    value: boolean;
};

// Since we are using the Union of Type1 and Type2, value can be either a number or string
let unionObj: UnionType = {
    value: 1
};

// With the GenericUnionType, our value can now be a string, a number, or a boolean
let genericUnionObj: GenericUnionType<UnionType> = {
    value: false
};