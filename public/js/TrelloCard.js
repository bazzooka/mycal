import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Card, CardExpandable, CardHeader, CardText, CardActions} from 'material-ui/lib/card/';
import SelectField from 'material-ui/lib/select-field';
import Avatar from 'material-ui/lib/avatar';
import TextField from 'material-ui/lib/text-field';

injectTapEventPlugin();

const TrelloCard = React.createClass({
  getInitialState(){
    return {
      importance: 1,
      duration: "2"
    }
  },

  componentDidMount() {

  },

  onPriorityChange(e, value){
    console.log(value);
    this.setState({importance: value});
  },

  onDurationChange(e, value){
    this.setState({duration: value});
  },

  render() {
    let priority = [
     { importance: '1', text: 'Not scheduled' },
     { importance: '2', text: 'Low priority' },
     { importance: '3', text: 'Medium priority' },
     { importance: '4', text: 'High priority' },
     { importance: '5', text: 'Must do for yesterday' },
    ],
    cardStyle= {display: "flex", justifyContent: "space-between", alignItems: "flex-end"};

    return (
        <Card initiallyExpanded={true}>
          <CardHeader
            title={this.props.card.name}
            subtitle={this.props.card.desc}
            avatar={<Avatar style={{color:'red'}}>A</Avatar>}
            actAsExpander={true}
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true} style={cardStyle}>
            <SelectField
              floatingLabelText="Priority"
              menuItems={priority}
              value={this.state.importance}
              valueMember="priority"
              onChange={this.onPriorityChange}
            />
            <TextField hintText="Duration" value={this.state.duration} onChange={this.onDurationChange}/>
          </CardText>
                                                                                                                                                                                                                                                                                                                                <CardText expandable={true}>
            
                                                                                                                                                                                                                                                                                                                                </CardText>
          
                                                                                                                                                                                                                                                                </Card>

    )
  },
});

export default TrelloCard;
