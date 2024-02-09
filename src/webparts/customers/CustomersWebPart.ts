import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,

} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import Customers from './components/Customers';
import { ICustomersProps } from './components/ICustomersProps';
import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';
import { ICustomer } from '../../dataContracts';

export interface ICustomersWebPartProps {
  description: string;
}

export default class CustomersWebPart extends BaseClientSideWebPart<{}> 
implements IDynamicDataCallables{



  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: 'customer',
        title: 'Customer'
      },
    ];
  }

  public getPropertyValue(propertyId: string): ICustomer {
    switch (propertyId) {
      case 'customer':
        return this._selectedCustomer;
    }

    throw new Error('Bad property id');
  }

  private _selectedCustomer: ICustomer;

  private _customerSelected = (customer: ICustomer): void => {
    // store the currently selected customer in the private field
    this._selectedCustomer = customer;

    // notify subscribers that the selected customer has changed
    this.context.dynamicDataSourceManager.notifyPropertyChanged('customer');
  }






  public render(): void {
    const element: React.ReactElement<ICustomersProps > = React.createElement(
      Customers,
      {
        onCustomerSelected: this._customerSelected,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this.context.dynamicDataSourceManager.initializeSource(this);

    return Promise.resolve();
  }



  

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
