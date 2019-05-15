import axios from "axios";
import * as qs from "qs";
import { assign, isEmpty } from "lodash";
import { has, get } from "common/helpers/session";

export const getDomain = parameters => {
  return parameters.$domain ? parameters.$domain : process.env.API_ORIGIN;
};

export const getConfig = parameters => {
  return parameters.$config ? parameters.$config : {};
};

export const request = (
  method,
  url,
  queryParameters,
  jsonBody,
  form,
  config
) => {
  method = method.toLowerCase();
  let keys = Object.keys(queryParameters);
  let queryUrl = url;
  if (keys.length > 0) {
    queryUrl = url + "?" + qs.stringify(queryParameters);
  }

  const headers = {};
  if (method != "GET") {
    headers["content-type"] = "application/x-www-form-urlencoded";
  }
  if (has()) {
    const userToken = get();
    headers.Authorization = `Bearer ${userToken}`;
  }

  const defaultConfig = {
    method: method,
    responseType: "json",
    withCredentials: false,
    headers
  };

  let mergedConfig;
  if (isEmpty(jsonBody) && isEmpty(form)) {
    mergedConfig = assign(defaultConfig, config);
  } else if (!isEmpty(jsonBody)) {
    /* For raw POST, PUT */
    mergedConfig = assign(
      {
        data: jsonBody
      },
      defaultConfig,
      config
    );
  } else {
    /* For form field POST, PUT */
    mergedConfig = assign(
      {
        data: qs.stringify(form)
      },
      defaultConfig,
      config
    );
  }
  return axios(queryUrl, mergedConfig);
};

function mergeQueryParams(parameters, queryParameters) {
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      let parameter = parameters.$queryParameters[parameterName];
      queryParameters[parameterName] = parameter;
    });
  }
  return queryParameters;
}

export const getCandidate = function(parameters = {}) {
  let path = "/candidate";
  let queryParameters = {};
  let jsonBody = {};
  let form = {};
  if (parameters["name"] !== undefined) {
    queryParameters["name"] = parameters["name"];
  }

  if (parameters["email"] !== undefined) {
    queryParameters["email"] = parameters["email"];
  }

  if (parameters["phone"] !== undefined) {
    queryParameters["phone"] = parameters["phone"];
  }

  if (parameters["position_id"] !== undefined) {
    queryParameters["position_id"] = parameters["position_id"];
  }

  if (parameters["position_name"] !== undefined) {
    queryParameters["position_name"] = parameters["position_name"];
  }

  if (parameters["unchecked_position_id"] !== undefined) {
    queryParameters["unchecked_position_id"] =
      parameters["unchecked_position_id"];
  }

  if (parameters["unchecked_recruiter_owner"] !== undefined) {
    queryParameters["unchecked_recruiter_owner"] =
      parameters["unchecked_recruiter_owner"];
  }

  if (parameters["recruiter_owner"] !== undefined) {
    queryParameters["recruiter_owner"] = parameters["recruiter_owner"];
  }

  if (parameters["is_blacklist"] !== undefined) {
    queryParameters["is_blacklist"] = parameters["is_blacklist"];
  }

  if (parameters["status"] !== undefined) {
    queryParameters["status"] = parameters["status"];
  }

  if (parameters["page"] !== undefined) {
    queryParameters["page"] = parameters["page"];
  }

  if (parameters["pageSize"] !== undefined) {
    queryParameters["pageSize"] = parameters["pageSize"];
  }

  if (parameters["sort"] !== undefined) {
    queryParameters["sort"] = parameters["sort"];
  }

  queryParameters = mergeQueryParams(parameters, queryParameters);
  return request(
    "GET",
    getDomain(parameters) + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters)
  );
};