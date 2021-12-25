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
  private updated = false;
  private valid = true;

  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...defaultPropsData, ...data };

    this.addValidateRule(RequireRule);
  }

  private validateRuleCheck = (): ValidateRule | null => {
    const targetValue = this.data.text;
    const validates = this.validateRules.filter(validate => validate.rule.test(targetValue) !== validate.match);
    const validateMessage = validates[0] ? validates[0] : null;

    return validateMessage;
  }

  private buildData = () => {
    const validateCheck = this.validateRuleCheck();
    
    if (this.updated) {
      return {
        ...this.data,
        updated: this.updated,
        valid: !validateCheck,
        validateMessage: validateCheck ? validateCheck.message : ''
      }
    } else {
      return {
        ...this.data,
        updated: this.updated,
        valid: this.valid,
        validateMessage: ''
      }
    }
  }

  private renderUpdate = () => {
    const container = document.querySelector(`#field-${this.data.id}`) as HTMLElement;
    const divFragment = document.createElement("div") as HTMLElement;
    divFragment.innerHTML = this.template(this.buildData());
    container.innerHTML = divFragment.children[0].innerHTML;
  }

  private addEventlistener = () => {
    document.querySelector(this.container)?.addEventListener('change', this.onChange);
  }

  private onChange = (e: Event) => {
    const { id, value } = e.target as HTMLInputElement;
    
    if (id === this.data.id) {
      this.updated = true;
      this.data.text = value;
      this.renderUpdate();
    }
  }

  public addValidateRule = (rule: ValidateRule) => {
    this.validateRules.push(rule);
  }

  public render = (append = false) => {
    const container = document.querySelector(this.container) as HTMLElement;

    if (append) {
      const divFragment = document.createElement('div');
      divFragment.innerHTML = this.template(this.buildData());
      container.appendChild(divFragment.children[0]);
    } else {
      container.innerHTML = this.template(this.buildData());
    }
    this.addEventlistener();
  }
}

export default TextField;
