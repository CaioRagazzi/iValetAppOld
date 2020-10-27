import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import {format, parseISO, formatDistance, subHours} from 'date-fns';

export default function CardCar({onPress, data}) {
  console.log(parseISO(data.startDate).getUTCHours());
  return (
    <TouchableOpacity onPress={() => (onPress ? onPress() : null)}>
      <Card>
        <Card.Title>{data.placa.toUpperCase()}</Card.Title>
        <Card.Divider />
        <View>
          <Text>
            Entrada: {format(parseISO(data.startDate, 'dd/MM/yyyy HH:mm:ss'))}
          </Text>
          <Text>
            Tempo Total:{' '}
            {formatDistance(parseISO(data.startDate), subHours(new Date(), 3))}
          </Text>
          {data.prisma > 0 ? <Text>Prisma: {data.prisma}</Text> : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
}
