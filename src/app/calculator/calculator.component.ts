import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  
  currentNumber:string = '0';
  private firstOperand: number | null = null;
  private operator: string | null = null;
  private waitForSecondNumber:boolean = false;

  constructor(){}
  ngOnInit(){}

    public getNumber(v: string):void {
      console.log(v);
      if(this.waitForSecondNumber)
      {
        this.currentNumber = v;
        this.waitForSecondNumber = false;
      }
      else
      {
        this.currentNumber = this.currentNumber === '0' ? v : this.currentNumber + v;
      }
      
  }

  public getDecimal():void{
    if(!this.currentNumber.includes('.')){
      this.currentNumber +='.';
    }
  }

  private doCalculation(operator: string, secondOperand: number): number |string {
    const firstOperand = this.firstOperand !== null ? this.firstOperand : parseFloat(this.currentNumber);
    switch(operator){
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        if(secondOperand === 0)
          return "Error";        
        else
          return firstOperand / secondOperand;
      case '=':
        return secondOperand;
      default:
        throw new Error('Invalid operator');
    }
  }

  public getOperation(input: string) : void{
    console.log(input);

    if(this.firstOperand === null){
      this.firstOperand = parseFloat(this.currentNumber);
    }
    else if(this.operator)
    {
      const result = this.doCalculation(this.operator, parseFloat(this.currentNumber));
      if(result === 'Error')
        showError();
      else
      {
        this.currentNumber = String(result);
        this.firstOperand = parseFloat(this.currentNumber);
      }
    }
    this.operator = input;
    this.waitForSecondNumber = true;
  }

  public clear(){
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}
function showError() {
  window.alert(new Error('Invalid Operation').message);
  
}

