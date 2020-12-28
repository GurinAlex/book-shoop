import { Component, OnInit } from '@angular/core';
import {BookService} from '../../shared/services/book.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  showPreview = true;
  showEnd = false;
  booksResult = [];
  quiz = [
    {
      a1: 'Проза',
      a2: 'Детектив',
      a3: 'Фантастика',
      a4: 'Любовный роман',
      a5: 'Приключения',
      title: 'Какому жанру вы бы отдали предпочтение прямо сейчас?'
    },
    {
      a1: 'Романтический XIX век',
      a2: 'Начало XX века',
      a3: 'Современность',
      a4: 'Далекое будущее',
      a5: 'Не вижу смысла в привязке по времени, главное, чтобы информация была полезной',
      title: 'О каком времени вы больше всего любите читать в книгах?'
    },
    {
      a1: 'Наблюдательный человек с хорошим чувством юмора',
      a2: 'Персонаж, который постоянно совершенствуется',
      a3: 'Герой с большой буквы: тот, кем можно восхищаться',
      a4: 'Человек, который не живет только своими проблемами, а пытается разобраться в окружающем мире',
      a5: 'Персонаж с нелегкой судьбой, пробивающийся сквозь жизненные невзгоды',
      title: 'Каким бы вы хотели видеть главного героя?'
    },
    {
      a1: 'Полезная информация, которую из неё можно почерпнуть',
      a2: 'Реальность происходящего – сюжет можно примерить на себя',
      a3: 'Прекрасная фантазия автора',
      a4: 'Увлекательная история',
      a5: 'Многоплановость и множество сюжетных линий',
      title: 'Что самое ценное в хорошей книге?'
    },
    {
      a1: 'Поиск приключений',
      a2: 'Что-то космическое',
      a3: 'Самосовершенствование',
      a4: 'Тайна',
      a5: 'Любовь',
      title: 'Какое слово лучше всего характеризует ваше нынешнее состояние?'
    }
  ];
  activeQ = 0;
  answer = '';
  a1 = false;
  a2 = false;
  a3 = false;
  a4 = false;
  a5 = false;

  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
  }

  resetTets(): void {
    this.activeQ = 0;
    this.answer = '';
    this.showPreview = true;
    this.showEnd = false;
    this.booksResult = [];
  }

  reset(): void {
    setInterval(() => {
      return false;
    }, 1000);
  }

  nextQuestion(answer, a): void {
    if (this.activeQ === 0) {
      this.answer = answer;
    }

    if (a === 'a1') {
      this.a1 = true;
    }
    if (a === 'a2') {
      this.a2 = true;
    }
    if (a === 'a3') {
      this.a3 = true;
    }
    if (a === 'a4') {
      this.a4 = true;
    }
    if (a === 'a5') {
      this.a5 = true;
    }

    if (this.activeQ === 4) {
      this.bookService.getAllWithQuery(this.answer).subscribe(books => {
        this.showEnd = true;
        let booksN = books;

        const randomIndex = Math.floor(Math.random() * (booksN.length));
        this.booksResult.push(booksN[randomIndex]);
        booksN = booksN.filter(_ => _.id !== this.booksResult[0].id);

        const randomIndex2 = Math.floor(Math.random() * (booksN.length));
        this.booksResult.push(booksN[randomIndex2]);
        booksN = booksN.filter(_ => _.id !== this.booksResult[1].id);

        const randomIndex3 = Math.floor(Math.random() * (booksN.length));
        this.booksResult.push(booksN[randomIndex3]);
        booksN = booksN.slice(randomIndex, 1);

        console.log(this.booksResult);
      });
    }
    if (this.activeQ !== 4) {
      setTimeout(() => {
        this.activeQ += 1;
        this.a1 = false;
        this.a2 = false;
        this.a3 = false;
        this.a4 = false;
        this.a5 = false;
      }, 1000);
    }
  }

}
