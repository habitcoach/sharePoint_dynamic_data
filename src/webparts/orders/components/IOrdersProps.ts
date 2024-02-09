import { DynamicProperty } from '@microsoft/sp-component-base';
import { ICustomer } from '../../../dataContracts';

export interface IOrdersProps {
  needsConfiguration: boolean;
  customer: DynamicProperty<ICustomer>;
  onConfigure: () => void;
}
