interface DelOperation {
  type: "delete";
  pos: number;
  len: number;
}

interface InsOperation {
  type: "insert";
  pos: number;
  content: string;
}

export type JostOperation = DelOperation | InsOperation;

class jsot {
  private content: string;
  private operations: JostOperation[];

  constructor(content: string) {
    this.content = content;
    this.operations = [];
  }

  insert(pos: number, content: string) {
    const op: InsOperation = {
      type: "insert",
      pos,
      content,
    };
    this.operations.push(op);
  }

  delete(pos: number, len: number) {
    const op: JostOperation = {
      type: "delete",
      pos,
      len,
    };
    this.operations.push(op);
  }

  setContent(content: string) {
    this.content = content;
  }

  execute(): string {
    const ops = [...this.operations];

    for (let i = 0; i < ops.length; i++) {
      const op = ops[i] as JostOperation;
      if (op.type === "insert") {
        this.content = [
          this.content.slice(0, op.pos),
          op.content,
          this.content.slice(op.pos),
        ].join("");

        this.operations.splice(i, 1);
        this.adjustOperations(op.pos, op.content.length);
      } else {
        this.content = [
          this.content.slice(0, op.pos),
          this.content.slice(op.pos + op.len),
        ].join("");

        this.operations.splice(i, 1);
        this.adjustOperations(op.pos, op.len);
      }
    }
    return this.content;
  }

  private adjustOperations(pos: number, len: number) {
    // adjust the postion of all operations after the executed operation
    for (let i = 0; i < this.operations.length; i++) {
      const op = this.operations[i] as JostOperation;

      if (isInsert(op)) {
        if (op.pos > pos) {
          op.pos += len;
        }
      } else {
        if (op.pos > pos) {
          op.pos -= len;
        }
      }
    }
  }
}

function isInsert(op: JostOperation): op is InsOperation {
  return op.type === "insert";
}

function isDelete(op: JostOperation): op is DelOperation {
  return op.type === "delete";
}

export default jsot;
