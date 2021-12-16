import { AnyObject, ValidateRule } from '../types';
import { RequireRule } from '../contacts';
import template from './text-field.template';

type Props = {
  id: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'password';
  text?: string;
  placeholder: string;
  require: boolean;
}

const defaultPropsData = {
  id: '',
  label: '',
  type: 'text',
  text: '',
  placeholder: '',
  require: false,
}

export class TextField {
  private template = template;
  private container: string;
  private data: AnyObject;
  private validateRules: ValidateRule[] = [];

  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...defaultPropsData, ...data };

    this.addValidateRule(RequireRule);
  }

  public addValidateRule = (rule: ValidateRule) => {
    this.validateRules.push(rule);
  }

  public render = (append = false) => {
    const container = document.querySelector(this.container) as HTMLElement;

    if (append) {
      const divFragment = document.createElement('div');
      divFragment.innerHTML = this.template(this.data);
      container.appendChild(divFragment.children[0]);
    } else {
      container.innerHTML = this.template(this.data);
    }
  }
  
}

export default TextField;
