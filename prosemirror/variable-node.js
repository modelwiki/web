let variableValues = {
  1: "123 cats",
  2: "246 dogs",
};

export const variableNodeSpec = {

    attrs: {
        variableId: {},
    },
    inline: true,
    group: "inline",
    draggable: false,
  
    toDOM: node => 
        ["input", {
            "m-variable": node.attrs.variableId,
            "class": "m-variable",
            "type": "button",
            "value": variableValues[node.attrs.variableId]
        }],

    parseDOM: [{
      tag: "input[m-variable]",
      getAttrs: dom => {
        let variableId = dom.getAttribute("m-variable");
        return {variableId};
      }
    }]

}

