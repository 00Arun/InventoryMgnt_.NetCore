import { ResponseModel } from '../shared-model/response.model';
import { User } from '../_models';

export class UserResponse extends ResponseModel {
    public entity: User;
}
