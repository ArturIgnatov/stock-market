import React, { FC, memo, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { ITikers } from '@models/ticker';
import { QuoteRow } from './quote-row/QuoteRow';
import { ROW_HEIGHT } from '@screens/quotes-screen/quote-row/styles';
import { QuoteCell } from './qoute-cell/QouteCell';
import { styles } from '@components/tab-view/styles';

interface IProps {
  quotes: ITikers;
}

export const QuotesViewer: FC<IProps> = memo(({ quotes }) => {
  const qoutesData = useMemo(() => {
    return Object.entries(quotes);
  }, [quotes]);

  return (
    <View>
      <TableColumns />
      <FlatList
        scrollEventThrottle={16}
        maxToRenderPerBatch={10}
        renderToHardwareTextureAndroid
        data={qoutesData}
        pagingEnabled
        decelerationRate={0.8}
        snapToInterval={ROW_HEIGHT * 5}
        keyExtractor={([key, item]) => item.id + key}
        renderItem={({ item: [key, item] }) => <QuoteRow {...item} quoteName={key} />}
      />
    </View>
  );
});

const TableColumns: FC = () => {
  return (
    <View style={styles.top}>
      <QuoteCell value="Name" fontWeight="700" />
      <QuoteCell value="Percent Change" align="center" />
      <QuoteCell value="Last" align="center" />
      <QuoteCell value="Highest Bid" align="flex-end" />
    </View>
  );
};
