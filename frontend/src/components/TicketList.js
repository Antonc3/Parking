import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text} from 'react-native';
import { ListItem } from '@rneui/themed'
import styles from '../style/style';

const TicketList = () => {
    const [expanded, setExpanded] = React.useState(false);
    const { ticketHistory } = useSelector((state) => state.payment);
    return (
        <View style={styles.container}>
        <ListItem.Accordion
        content={
            <>
            <ListItem.Content>
                <ListItem.Title>
                    Prior Tickets
                </ListItem.Title>
            </ListItem.Content>
            </>
        }
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
        >
        {ticketHistory.map(ticket => {
            return <ListItem key={ticket.id}>
                <ListItem.Content>
                    <Text>Lot Name: {ticket.lotName}</Text>
                    <Text>Lot Location: {ticket.lotLocation}</Text>
                    <Text>Date Entered: {ticket.dateEntered}</Text>
                    <Text>Date Exited: {ticket.dateExited}</Text>
                    <Text>Amount: {ticket.amount}</Text>
                {(ticket.amount > 0) ? <Text>Payment Method: {ticket.paymentMethod.last4} - {ticket.paymentMethod.brand}</Text> : <></>}
                </ListItem.Content>
            </ListItem>
        })}
        </ListItem.Accordion>
        </View>
    )
}

export default TicketList;