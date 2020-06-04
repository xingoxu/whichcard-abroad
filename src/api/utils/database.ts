import { DynamoDB } from 'aws-sdk';
import { Brand as CardBrand } from '../../constants/cards';
import { SupportedCurrencyKey } from '../../constants/SupportedCurrency';
import { format } from 'date-fns';

type DBCurrencyObject = {
  [brand in CardBrand]?: {
    [transCurrency in SupportedCurrencyKey]?: {
      // Exclude<
      //   SupportedCurrencyKey,
      //   transCurrency
      // >
      [billCurrency in SupportedCurrencyKey]?: string;
    };
  };
} & {
  date: string;
};

const DATE_FORMAT = 'yyyy-MM-dd';

const DYANMODB_TABLE: string = process.env
  .DYANMODB_TABLE!;
const DYANMODB_PRIMARY_KEY: string = process
  .env.DYANMODB_PRIMARY_KEY!;
const DYANMODB_REGION: string = process.env
  .DYANMODB_REGION!;

const dynamoDBClient = new DynamoDB({
  region: DYANMODB_REGION
});

const queryFromCache = async (
  date: Date
): Promise<DBCurrencyObject | undefined> => {
  const {
    Count,
    Items
  } = await dynamoDBClient
    .query({
      TableName: DYANMODB_TABLE,
      KeyConditionExpression: `#key=:dt`,
      ExpressionAttributeNames: {
        '#key': DYANMODB_PRIMARY_KEY
      },
      ExpressionAttributeValues: {
        ':dt': {
          S: format(date, DATE_FORMAT)
        }
      }
    })
    .promise();
  if (Count && Count == 1)
    return DyanmodbResultAdapter(
      Items![0]
    ) as DBCurrencyObject;
  return undefined;
};

const storeResult = async ({
  date,
  result,
  billCurr,
  transCurr,
  brand
}: {
  result: string;
  transCurr: SupportedCurrencyKey;
  billCurr: SupportedCurrencyKey;
  date: Date;
  brand: CardBrand;
}): Promise<void> => {
  let cacheResult = await queryFromCache(
    date
  );
  if (!cacheResult)
    cacheResult = {
      date: format(date, DATE_FORMAT)
    };
  if (!cacheResult[brand])
    cacheResult[brand] = {};
  if (!cacheResult[brand]![transCurr])
    cacheResult[brand]![transCurr] = {};

  cacheResult[brand]![transCurr]![
    billCurr
  ] = result;

  console.log('here');

  await dynamoDBClient
    .updateItem({
      Key: {
        [DYANMODB_PRIMARY_KEY]: {
          S: format(date, DATE_FORMAT)
        }
      },
      TableName: DYANMODB_TABLE,
      UpdateExpression: `set ${brand}=:${brand}`,
      ExpressionAttributeValues: {
        [`:${brand}`]: {
          M: DyanmodbRequestAdapter(
            cacheResult[brand]!
          )
        }
      }
    })
    .promise();
};

const DyanmodbRequestAdapter = (
  obj: Record<string, any>
): DynamoDB.AttributeMap => {
  const result = {} as DynamoDB.AttributeMap;
  for (let key in obj) {
    switch (typeof obj[key]) {
      case 'object': {
        result[key] = {
          M: DyanmodbRequestAdapter(obj[key])
        };
        break;
      }
      case 'string': {
        result[key] = { S: obj[key] };
        break;
      }
    }
  }
  return result;
};

const DyanmodbResultAdapter = (
  item: DynamoDB.AttributeMap
) => {
  let result = {} as Record<string, any>;
  for (let key in item) {
    if (item[key].M) {
      result[key] = DyanmodbResultAdapter(
        item[key].M!
      );
    } else if (item[key].S) {
      result[key] = item[key].S!;
    }
  }
  return result;
};

export { queryFromCache, storeResult };
