import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import {format, parseISO, formatDistance} from 'date-fns';

export default function CardCar({onPress, data}) {
  return (
    <TouchableOpacity onPress={() => (onPress ? onPress() : null)}>
      <Card>
        <Card.Title>{data.placa.toUpperCase()}</Card.Title>
        <Card.Divider />
        <View>
          <Text>
            Entrada: {format(parseISO(data.startDate), 'MM/dd/yyyy HH:mm:ss')}
          </Text>
          <Text>
            Tempo Total: {formatDistance(parseISO(data.startDate), new Date())}
          </Text>
          {data.prisma > 0 ? <Text>Prisma: {data.prisma}</Text> : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
}
