import { Component,OnInit, AfterViewInit } from '@angular/core';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { AuthGuardService } from '../auth/auth-guard.service';
import { interval } from 'rxjs';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, AfterViewInit {
 
  // Movies = [
  //   'Blade Runner',
  //   'Cool Hand Luke',
  //   'Heat',
  //   'Juice',
  //   'The Far Side of the World',
  //   'Morituri',
  //   'Napoleon Dynamite',
  //   'Pulp Fiction'
  // ];
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.Movies, event.previousIndex, event.currentIndex);
  // }
   // Transfer Items Between Lists
   hidden:boolean=true;
   hidden1:boolean=false;
   quizStart() {
    this.hidden=false;
    this.hidden1=true;
   }
  //  MoviesList = [
  //   '// comment',
  //   '<!-- comment -->',
  //   '/* comment */',
    
  // ];
  // MoviesWatched = [
  //   ''
  // ];
  // onDrop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //     //alert('success')
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //      // alert('Fail')
  //   }
  // } 
  
  name: any = "";
  public isCorrect : Boolean = false;
  public questionList: any = [];
  selectedOption: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  constructor(private questionService: AuthGuardService) { }

  ngOnInit(): void {
    this.getAllQuestions();
    this.startCounter();
  }
  ngAfterViewInit(): void {
    this.name = sessionStorage.getItem("name");
  }
  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
    
   
  }
  onDrop(event: CdkDragDrop<string[]>) {
    
    console.log(event);
    this.selectedOption = [event.container.data]
  }
  canDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  answer(event: any, currentQno: number, option: any) {
    console.log(event);
    this.selectedOption = [];
    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }
  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questionList, event.previousIndex, event.currentIndex);
  }
}
