import * as React from 'react';
import styles from './Customers.module.scss';
import type { ICustomersProps } from './ICustomersProps';


import { ICustomersState } from './ICustomersState';
import { ListView, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
export default class Customers extends React.Component<ICustomersProps, ICustomersState> {


  constructor(props: ICustomersProps) {
    super(props);

    // Initialize state
    this.state = {
      loading: false,
      customers: [] // Initialize customers array
    };
  }


  private _getSelection = (event: any[]): void => {
    // raise the container web part event for customer selected
    this.props.onCustomerSelected(event[0]);
  }
  public componentDidMount(): void {
    // update the state with loading
    this.setState({
      loading: true
    });

    this.setState({
      loading: false,
      customers: [{
        customerId: 'C001',
        name: 'Customer 01',
        email: 'info@customer01.com',
      },
      {
        customerId: 'C002',
        name: 'Customer 02',
        email: 'info@customer02.com',
      },
      {
        customerId: 'C003',
        name: 'Customer 03',
        email: 'info@customer03.com',
      }
    ]});
  }


  public render(): React.ReactElement<ICustomersProps> {
    return (
      <div className={ styles.customers }>
        <div className={ styles.container }>
          <ListView
            items={this.state.customers}
            viewFields={[
              {
                name: 'customerId',
                displayName: 'ID',
                sorting: true,
                maxWidth: 100,
              },
              {
                name: 'name',
                displayName: 'name',
                sorting: true,
                maxWidth: 100,
              },
              {
                name: 'email',
                displayName: 'E-Mail',
                sorting: true,
                maxWidth: 100,
              },
            ]}
            compact={true}
            selectionMode={SelectionMode.single}
            selection={this._getSelection} />
        </div>
      </div>
    );
  }
}
