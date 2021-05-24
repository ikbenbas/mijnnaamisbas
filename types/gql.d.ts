import { DocumentNode } from 'graphql';

declare module '*.gql' {
    /* eslint-disable-next-line init-declarations */
    const content: DocumentNode;
    export default content;
  }

  declare module '*.graphql' {
    /* eslint-disable-next-line init-declarations */
    const content: DocumentNode;
    export default content;
  }
