"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");
// interface UserCreationParams {
//   name: string;
//   password: string;
//   passwordConfirm: string;
//   email: string;
// }
let AuthController = class AuthController extends tsoa_1.Controller {
    constructor() {
        super();
    }
    signup = catchAsync(async (req, res, next) => {
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm,
            });
            res.status(201).send({ message: "User Created Successfully" });
        }
        catch (error) {
            console.error(error);
            return next(new AppError(401, error.message));
        }
    });
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.Post)("/"),
    (0, tsoa_1.SuccessResponse)(201, "User Created Successfully"),
    (0, tsoa_1.Response)(401, "Bad Request"),
    __metadata("design:type", Object)
], AuthController.prototype, "signup", void 0);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("/user"),
    (0, tsoa_1.Tags)("User"),
    __metadata("design:paramtypes", [])
], AuthController);
//# sourceMappingURL=authController.js.map