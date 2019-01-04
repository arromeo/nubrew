import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import '../__mock__/xhr-mock';

import ConfirmPrompt from '../screens/vote/ConfirmPrompt';
import VoteComponent from '../screens/vote/VoteComponent';

import props from '../__mock__/props';

describe('Vote Components render properly', () => {
  it('Confirm prompt component renders', () => {
    const tree = renderer.create(<ConfirmPrompt navigate={props.navigation.navigate} data={props.data} couldNotFind={props.couldNotFind}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('VoteComponent renders properly', () => {
    const tree = renderer.create(<VoteComponent navigationParams={props.navigationParams}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
})