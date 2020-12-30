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

  public async findAsset(query: string): Promise<{ data: Record<string, unknown>; id: string }[]> {
    return this.connection.searchAssets(query);
  }

  public async findMetadata(query: string): Promise<{ metadata: Record<string, unknown>; id: string }[]> {
    return this.connection.searchMetadata(query);
  }

  public async getTransaction<T = unknown>(transactionId: string): Promise<BigchainDbTransaction<T>> {
    return this.connection.getTransaction(transactionId);
  }

  public async listTransactions(assetId: string): Promise<BigchainDbTransaction<unknown>[]> {
    return this.connection.listTransactions(assetId);
  }

  public async searchTransactionsByAsset(query: string) {
    const assets = await this.findAsset(query);
    if (assets && assets.length) {
      const transactions = await Promise.all(
        assets.map(async (asset) => ({
          [asset.id]: (await this.listTransactions(asset.id)).reverse()
        }))
      );
      return transactions.reduce((acc, curr) => {
        const [assetId] = Object.keys(curr);
        acc[assetId] = curr[assetId];
        return acc;
      }, {});
    }
    return null;
  };

  public async listOutputs(publicKey: string, spent: boolean = false): Promise<{ transaction_id: string; output_index: number }[]> {
    return this.connection.listOutputs(publicKey, spent);
  }

  public transactionLink(transaction: BigchainDbTransaction<unknown>) {
    return `${this.dbUrl}transactions/${transaction.id}`;
  }

  public getAssetId(transaction: BigchainDbTransaction<unknown>) {
    return transaction.operation === 'CREATE'
      ? transaction.id
      : transaction.asset.id;
  }
}
