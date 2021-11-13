import { type } from "os";

export class Answer
{
    Answer: string;
    True: boolean;
    Selected: boolean;
    Disabled: boolean;
    Letter: Letter | null;

    constructor(Answer: string, True: boolean = false, Selected: boolean = false, Disabled : boolean = false, Letter: Letter | null = null)
    {
        this.Answer = Answer;
        this.True = True;
        this.Selected = Selected;
        this.Disabled = Disabled;
        this.Letter = Letter;
    }
}

export class Question
{
    Question: string;
    Difficulty: 1 | 2 | 3;
    Answers: Answer[];

    constructor(Question: string, Difficulty: 1 | 2 | 3, Answers: Answer[])
    {
        this.Question = Question;
        this.Difficulty = Difficulty;
        this.Answers = Answers;
    }
}

class JokerX
{
    name: JokerType;
    available: boolean = true;

    constructor(name: JokerType)
    {
        this.name = name;
    }
}

export class Joker5050 extends JokerX
{
    constructor(name: JokerType = "50/50")
    {
        super(name);
    }
}

export class JokerAudience extends JokerX
{
    percentages: number[] = [0,0,0,0];
    modalOpen: boolean = false;
    usedInCurrentQuestion: boolean = false;

    constructor(name: JokerType = "Audience")
    {
        super(name); 
    }
}

export class JokerPhone extends JokerX
{
    modalOpen: boolean = false;
    modalText: string[] = [];

    constructor(name: JokerType ="Phone")
    {
        super(name);
    }
}

export class Joker
{
    Name: JokerType;
    Text: string;
    Available: boolean;
    UsedInCurrentQuestion: boolean;
    
    constructor(Name : JokerType, Text: string = Name, Available: boolean = true, UsedInCurrentQuestion: boolean = false)
    {
        this.Name = Name;
        this.Text = Text;
        this.Available = Available;
        this.UsedInCurrentQuestion = UsedInCurrentQuestion;
    }
}

export type Letter =
{
    Letter : "A"|"B"|"C"|"D";
    Index: 0|1|2|3;
}

export type JokerType = "50/50"|"Audience"|"Phone";

export class Prize
{
    amount: number;
    current: boolean;
    step: boolean;

    constructor(amount: number)
    {
        this.amount = amount;
        this.current = amount == 100;
        this.step = amount == 1000 || amount == 32000 || amount == 1000000;
    }
}