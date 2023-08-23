import { $$ } from '../../lauch/engine';

class Collection {
  selector: string;
  fragment;

  constructor(selector: string, fragment) {
    this.selector = selector;
    this.fragment = fragment;
  }

  async getData(data: { [k: string]: null } = {}) {
    const FragmentClass = this.fragment;

    const fragmentRootElements = $$(this.selector);

    const result = await fragmentRootElements.map(async (el) => {
      const collectionFragmentInstance = new FragmentClass(el);

      const collectionFragmentData = await collectionFragmentInstance.getData(data);

      return collectionFragmentData;
    });

    return result;
  }
}

export { Collection };
