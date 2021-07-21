import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    return this._domSanitizer.bypassSecurityTrustHtml(this.stylize(value));
  }

  private stylize(text: string): string {
    let stylizedText: string = '';
    if (text && text.length > 0) {
      for (let t of text.split(" ")) {
        if (t.startsWith("http") && t.length>1){
            if (t.split('\n')){
                stylizedText += '<a style="color:unset; display:block" href= ' + t.split('\n')[0] +  '>' + t.split('\n')[0] + '</a>';
                stylizedText += t.split('\n')[1] + " ";
                continue;
            }
          stylizedText += '<a href= ' + t +  '>' + t + '</a>';
        }
        else
          stylizedText += t + " ";
      }
      return stylizedText;
    }
    else return text;
  }

}