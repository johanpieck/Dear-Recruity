export class Test {
    id: string;
    firstname: string;
    lastname: string;
    steps: Step[];
}

export class Step {
    question: string;
    answer: string;
}