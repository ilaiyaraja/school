

/**
 * 
 * Below model can be used to store any key and value
 * @param key
 * @param value
 * @returns
 */

function KeyValueModel (key, value) 
{
    this.key = key;
    this.value = value;
}
 
KeyValueModel.prototype.getKey = function() 
{
    return this.key;
};

KeyValueModel.prototype.getValue = function() 
{
    return this.key;
};

//////////////////////////////////////////////////////////////////////////////////







