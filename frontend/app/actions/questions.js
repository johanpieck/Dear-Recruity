// @flow
import type { questionsStateType } from '../reducers/questions';
import * as contentful from "contentful";

type actionType = {
  +type: string
};

export const FETCH_QUESTIONS_BEGIN   = 'FETCH_QUESTIONS_BEGIN';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';

export const fetchQuestionsBegin = () => ({
  type: FETCH_QUESTIONS_BEGIN
});

export const fetchQuestionsSuccess = questions => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: { questions }
});

export const fetchQuestionsError = error => ({
  type: FETCH_QUESTIONS_FAILURE,
  payload: { error }
});

export function fetchQuestions() {
    return dispatch => {
      dispatch(fetchQuestionsBegin());
      console.log('Start fetching');
      contentful.createClient({
            space: 'a1u244fv3bsz',
            accessToken: 'dd0796aa887494fac937ea656eb9b330db9d69e1e7889e98b99c040ae6854986'
        }).getEntries().then(response => {
              console.log('response',response);
              dispatch(fetchQuestionsSuccess(response));
        });
    };
}