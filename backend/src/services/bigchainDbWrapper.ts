/* eslint-disable camelcase,@typescript-eslint/camelcase */
import {Connection} from 'bigchaindb-driver';

interface BigchainDbTransactionCommon {
  id: string;
  inputs: {
    fulfillment: string;
    fulfills: {
      output_index: number;
      transaction_id: string;
    } | null;
    owners_before: string[];
  }[];
  outputs: {
    amount: string;
    condition: any[];
    public_keys: string[];
  }[];
  version: string;
  metadata: {
    timestamp: string;
    [key: string]: unknown;
  };
}

export interface BigchainDbTransferTransaction extends BigchainDbTransactionCommon {
  asset: {
    id: string;
  };
  operation: 'TRANSFER';
}

export interface BigchainDbCreateTransaction<T> extends BigchainDbTransactionCommon {
  asset: {
    data: T;
  };
  operation: 'CREATE';
}

export declare type BigchainDbTransaction<T> = BigchainDbTransferTransaction | BigchainDbCreateTransaction<T>

export class BigchainDbWrapper {
  private connection: Connection;

  public constructor(private dbUrl: string) {
    this.connection = new Connection(dbUrl);
  }

  public async findAsset(query: string): Promise<{ data: unknown; id: string }[]> {
    /* eslint-disable no-underscore-dangle */
    return this.connection._req(this.connection.getApiUrls('assets'), {
      query: {
        search: query,
        limit: 1
      }
    });
  }

  public async getTransaction<T = unknown>(transactionId: string): Promise<BigchainDbTransaction<T>> {
    return this.connection.getTransaction(transactionId);
  }

  public transactionLink(transaction: BigchainDbTransaction<unknown>) {
    return `${this.dbUrl}transactions/${transaction.id}`;
  }
}
