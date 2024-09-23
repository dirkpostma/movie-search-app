import React from 'react';
import {Screen} from '../../core/ui/atoms/screen';
import {H1, H3, P} from '../../core/ui/atoms/typography';
import {SafeAreaView} from 'react-native';

export const AboutScreen = () => {
  return (
    <Screen>
      <SafeAreaView>
        <H1>About</H1>
        <P>Quickly search for movies using themoviedb.org API.</P>
        <H3>Techstack</H3>
        <P>
          Technologies used in this app: React Native, Typescript, Redux
          Toolkit, Jest, Maestro, amongst others.
        </P>
        <H3>Source</H3>
        <P>
          Source can be found on https://github.com/dirkpostma/movie-search-app
        </P>
        <H3>Contact</H3>
        <P>
          Movie Search App was created by Dirk Postma, freelance React Native
          developer based in The Netherlands. You can contact me via dirkpostma@gmail.com
        </P>
        <P>Happy coding!</P>
      </SafeAreaView>
    </Screen>
  );
};
