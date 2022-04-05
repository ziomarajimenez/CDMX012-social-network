const dataDoc = JSON.parse('{"timestamp":{"seconds":1648691703,"nanoseconds":327000000},"text":"hey","displayName":"daniela miñon","uid":"gK40FvvNsxbf0vXZ03dSKrn1Voc2","likes":[]}');
const doc = {
  data: () => dataDoc,
};
export const getPost = () => Promise.resolve([doc]);
