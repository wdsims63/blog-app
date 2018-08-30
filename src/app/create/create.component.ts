import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  articleForm: FormGroup;
  articles: Array<Article>;

  constructor(private _articleService: ArticleService, private router: Router, private aR: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this._articleService.getArticles()
      .subscribe(res => this.articles = res);

    this.articleForm = this.fb.group({
      'title': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(45)])],
      'content': [null, Validators.compose([Validators.required, Validators.minLength(10)])]

    });
  }

  addArticle(article: Article) {
    this._articleService.insertArticle(article)
      .subscribe(newArticle => {
        this.articles.push(newArticle);
        this.router.navigateByUrl('/');
      });
  }

}
