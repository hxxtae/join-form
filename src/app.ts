import template from './app.template';
import { AnyObject } from './types';
import { TextField } from './views';
import { CantContainWhite, CantStartNumber, MinimumLengthLimit } from './contacts';

export class App {
  private template = template;
  private container: HTMLElement;
  private data: AnyObject;
  private fields: AnyObject[] = [];
  
  constructor(container: string, data: AnyObject) {
    this.container = document.querySelector(container) as HTMLElement;
    this.data = data;

    const idfield = new TextField(
      '#required-fields',
      { id: 'id', label: '아이디', type: 'text', placeholder: '아이디를 입력해 주세요.', require: true, }
    );

    idfield.addValidateRule(CantContainWhite);
    idfield.addValidateRule(CantStartNumber);
    idfield.addValidateRule(MinimumLengthLimit(3));
    
    this.fields.push(idfield);
  }

  render() {
    this.container.innerHTML = this.template(this.data);
    this.fields.forEach(field => {
      field.render();
    });
  }
}

export default App;
