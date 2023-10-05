import { Cast } from "../interfaces/Cast.tsx";
import { BaseCastArray } from "../interfaces/BaseCastArray.tsx";

// Generates a random index to use on the BaseCase Array 
function generateRandomNumber(arrayLength: number) {
    return Math.floor(Math.random() * arrayLength)
  }

// Generates a random index in the BaseCastArray
const generateTargetIndex = () => {
    return generateRandomNumber(BaseCastArray.length);
}

// This function maps the attributes of a cast to a new Cast
const createCast = (targetIndex: number) => {
    const result: Cast = {
      id: BaseCastArray[targetIndex].id,
      odu: BaseCastArray[targetIndex].odu,
      timestamp: Date.now(),
      answer: BaseCastArray[targetIndex].answer,
      maleObi1: BaseCastArray[targetIndex].maleObi1,
      maleObi2: BaseCastArray[targetIndex].maleObi2,
      femaleObi1: BaseCastArray[targetIndex].femaleObi1,
      femaleObi2: BaseCastArray[targetIndex].femaleObi2,
      interpretation: BaseCastArray[targetIndex].interpretation,
      title: BaseCastArray[targetIndex].title
    };

    return result;
}

const generatedCast = createCast(generateTargetIndex())


export { generatedCast };
