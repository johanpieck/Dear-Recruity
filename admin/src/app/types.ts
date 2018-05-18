export class Test {
    id: string;
    uuid: string;
    firstname: string;
    lastname: string;
    email: string;
    steps: Step[];
}

export class Step {
    question: string;
    answer: string;
}