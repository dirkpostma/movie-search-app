import React from 'react';
import {TextInput} from '../atoms/text-input';
import {TextInputProps} from 'react-native';

type Props = {
  onChange: TextInputProps['onChange'];
};

export const SearchMovieTextInput = ({onChange}: Props) => (
  <TextInput
    onChange={onChange}
    placeholder="Search movies..."
    autoCapitalize="none"
    autoComplete="off"
    autoCorrect={false}
    spellCheck={false}
    importantForAutofill="no"
    contextMenuHidden={true}
    textContentType="none"
  />
);
