import { snippetStub } from '../stubs/snippets.stub';

export const SnippetsService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockReturnValue(snippetStub().success),
});
