var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Parse.Cloud.define('hello functions', function (req) {
    return 'Hi functions';
});
Parse.Cloud.define('whoami', (req) => {
    const name = req.params.name;
    const money = req.params.money;
    const result = `Hello. ${name}! You will earn $${money}!!!`;
    return result;
});
Parse.Cloud.define('getItemList', (req) => __awaiter(this, void 0, void 0, function* () {
    const Character = Parse.Object.extend('Character'); // Get class from database
    const query = new Parse.Query(Character); // Make query from class
    try {
        const result = yield query.find(); // Get all datas
        return result;
    }
    catch (error) {
        throw error;
    }
}));
//# sourceMappingURL=index.js.map