import jsot from "./index";

const doc = "Hello world";
const state = new jsot(doc);

state.delete(5, " world".length);
state.insert(11, " out");
state.insert(11, " there");
const res = state.execute();
console.log(res);
